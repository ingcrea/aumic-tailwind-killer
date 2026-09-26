use clap::{Parser, ValueEnum};
use colored::*;
use rayon::prelude::*;
use std::collections::{HashMap, HashSet};
use std::fs;
use std::path::PathBuf;
use std::time::Instant;
use walkdir::WalkDir;
use regex::{Regex, Captures};
use sha2::{Sha256, Digest};
use serde::{Serialize, Deserialize};
use std::process::Command;

#[derive(Clone, Debug, ValueEnum)]
enum Mode {
    Simulate,
    Local,
    Restore,
}

#[derive(Parser, Debug)]
#[command(author, version, about = "⚔️ AUM-IC Tailwind Killer - Motor Nativo", long_about = None)]
struct Args {
    #[arg(short, long, value_enum)]
    mode: Mode,

    #[arg(short, long)]
    target: PathBuf,

    #[arg(short, long)]
    scope: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct AumicMap {
    original: String,
    hash: String,
}

fn generate_hash(input: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    let result = hasher.finalize();
    let hex_string = hex::encode(result);
    format!("aumic-rs-{}", &hex_string[0..6])
}

fn escape_css_class(class: &str) -> String {
    let mut escaped = String::new();
    escaped.push('.');
    for c in class.chars() {
        if match c {
            ':' | '/' | '[' | ']' | '%' | '.' | '#' | '!' | '(' | ')' | ',' => true,
            _ => false,
        } {
            escaped.push('\\');
        }
        escaped.push(c);
    }
    escaped
}

fn main() {
    let start_time = Instant::now();
    let args = Args::parse();

    println!("\n{}", "⚔️  AUM-IC TAILWIND KILLER v3.1.4 (Native Core)".cyan().bold());
    println!("{}", "[i] Motores de Rayon Desplegados: Concurrencia de CPU al 100%\n".bright_black());

    let target_dir = args.target.canonicalize().unwrap_or_else(|_| args.target.clone());
    
    if !target_dir.exists() {
        eprintln!("{}", "❌ Error: El directorio objetivo no existe.".red());
        std::process::exit(1);
    }

    if matches!(args.mode, Mode::Restore) {
        println!("{}", "¡Alerta! El modo Restore aún no está codificado en esta versión nativa. Por favor usa aumic-lock.json y git para restaurar.".yellow());
        return;
    }

    println!("{}", "- Fase 1: Escaneando archivos fuente...".yellow());
    
    let mut files_to_scan: Vec<PathBuf> = Vec::new();
    for entry in WalkDir::new(&target_dir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        if path.is_file() {
            let path_str = path.to_string_lossy();
            if path_str.contains("node_modules") || path_str.contains(".git") || path_str.contains("dist") || path_str.contains("target") {
                continue;
            }
            if let Some(ext) = path.extension() {
                let ext_str = ext.to_string_lossy().to_lowercase();
                if matches!(ext_str.as_str(), "astro" | "tsx" | "jsx" | "html" | "py" | "php" | "rs" | "vue" | "svelte") {
                    files_to_scan.push(path.to_path_buf());
                }
            }
        }
    }

    println!("{} Listos {} archivos para analizar.", "✔".green(), files_to_scan.len());

    println!("{}", "- Fase 2: Extracción concurrente de utilidades...".yellow());
    let regex_pattern = r#"(?s)(class|className|class:list)\s*(?:=|:)\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)"#;
    let extractor_regex = Regex::new(regex_pattern).expect("Regex inválida");

    let unique_classes: HashSet<String> = files_to_scan.par_iter().flat_map(|file| {
        let mut local_set = HashSet::new();
        if let Ok(content) = fs::read_to_string(file) {
            for cap in extractor_regex.captures_iter(&content) {
                let class_match = cap.get(2).or_else(|| cap.get(3)).or_else(|| cap.get(4));
                if let Some(m) = class_match {
                    let clean_str = m.as_str().replace('\n', " ");
                    for utility in clean_str.split_whitespace() {
                        let util = utility.trim();
                        if !util.is_empty() && !util.contains("aumic-") && !util.contains("{") && !util.contains("}") {
                            local_set.insert(util.to_string());
                        }
                    }
                }
            }
        }
        local_set
    }).collect();

    println!("{} Se extrajeron {} utilidades únicas de Tailwind.", "✔".green(), unique_classes.len());

    if unique_classes.is_empty() {
        println!("{}", "No se encontraron clases de Tailwind. Abortando.".cyan());
        return;
    }

    println!("{}", "- Fase 3: Generando Hashes Deterministas y mutando código fuente...".yellow());
    
    let mut crypto_map: HashMap<String, String> = HashMap::new();
    let mut lockfile_data: HashMap<String, AumicMap> = HashMap::new();

    for class_block in &unique_classes {
        let hash = generate_hash(class_block);
        crypto_map.insert(class_block.clone(), hash.clone());
        lockfile_data.insert(hash.clone(), AumicMap { original: class_block.clone(), hash });
    }

    let lockfile_path = target_dir.join("aumic-lock.json");
    if let Ok(json_data) = serde_json::to_string_pretty(&lockfile_data) {
        let _ = fs::write(&lockfile_path, json_data);
    }

    if matches!(args.mode, Mode::Local) {
        let files_mutated: usize = files_to_scan.par_iter().map(|file| {
            if let Ok(content) = fs::read_to_string(file) {
                let original_content = content.clone();
                
                let new_content_safe = extractor_regex.replace_all(&content, |caps: &Captures| {
                    let full_match = caps.get(0).unwrap().as_str();
                    let class_match = caps.get(2).or_else(|| caps.get(3)).or_else(|| caps.get(4)).unwrap();
                    let classes = class_match.as_str();
                    
                    let mutated_classes: Vec<String> = classes.split_whitespace().map(|cls| {
                        crypto_map.get(cls).unwrap_or(&cls.to_string()).clone()
                    }).collect();
                    
                    let new_block = mutated_classes.join(" ");
                    full_match.replace(classes, &new_block)
                }).to_string();

                if new_content_safe != original_content {
                    let _ = fs::write(file, new_content_safe);
                    return 1;
                }
            }
            0
        }).sum();
        
        println!("{} {} archivos fuente mutados estructuralmente.", "✔".green(), files_mutated);
    } else {
        println!("{} (Simulación) No se modificaron archivos fuente.", "✔".blue());
    }

    println!("{}", "- Fase 4: Orquestando Subproceso JIT nativo...".yellow());
    
    let all_classes = unique_classes.into_iter().collect::<Vec<String>>().join(" ");
    let virtual_html_content = format!("<div class=\"{}\"></div>", all_classes);
    let virtual_html_path = target_dir.join("aumic-virtual.html");
    let input_css_path = target_dir.join("aumic-input.css");
    let output_css_path = target_dir.join("aumic-ecosystem.css");

    let _ = fs::write(&virtual_html_path, virtual_html_content);
    let _ = fs::write(&input_css_path, "@tailwind utilities;");

    let mut command = if cfg!(windows) {
        let mut cmd = Command::new("cmd");
        cmd.args(["/C", "npx", "tailwindcss", "-i", "aumic-input.css", "-o", "aumic-ecosystem.css", "--content", "aumic-virtual.html", "--minify"]);
        cmd
    } else {
        let mut cmd = Command::new("npx");
        cmd.args(["tailwindcss", "-i", "aumic-input.css", "-o", "aumic-ecosystem.css", "--content", "aumic-virtual.html", "--minify"]);
        cmd
    };

    let status = command.current_dir(&target_dir).status();

    let _ = fs::remove_file(&virtual_html_path);
    let _ = fs::remove_file(&input_css_path);

    if let Ok(st) = status {
        if st.success() {
            println!("{} JIT Tailwind finalizado. Ofuscando selectores de CSS...", "✔".green());
            
            if let Ok(mut css_content) = fs::read_to_string(&output_css_path) {
                let mut sorted_keys: Vec<_> = crypto_map.keys().collect();
                sorted_keys.sort_by_key(|a| std::cmp::Reverse(a.len()));

                for orig in sorted_keys {
                    let hash = crypto_map.get(orig).unwrap();
                    let escaped_orig = escape_css_class(orig);
                    let replacement = format!(".{}", hash);
                    css_content = css_content.replace(&escaped_orig, &replacement);
                }

                let _ = fs::write(&output_css_path, css_content);
                println!("{} CSS nativo AUM-IC generado con éxito en aumic-ecosystem.css", "✔".green());
            }
        }
    }

    if matches!(args.mode, Mode::Local) {
        println!("{}", "- Fase 5: Erradicando dependencias de Tailwind...".red());
        
        let pkg_path = target_dir.join("package.json");
        if pkg_path.exists() {
            let _ = fs::copy(&pkg_path, target_dir.join("package.json.aumic-bak"));
        }

        let tw_configs = ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"];
        for conf in tw_configs {
            let conf_path = target_dir.join(conf);
            if conf_path.exists() {
                let _ = fs::rename(&conf_path, target_dir.join(format!("{}.aumic-bak", conf)));
            }
        }

        let mut npm_cmd = if cfg!(windows) {
            let mut cmd = Command::new("cmd");
            cmd.args(["/C", "npm", "uninstall", "tailwindcss", "postcss", "@tailwindcss/postcss"]);
            cmd
        } else {
            let mut cmd = Command::new("npm");
            cmd.args(["uninstall", "tailwindcss", "postcss", "@tailwindcss/postcss"]);
            cmd
        };

        if let Ok(_) = npm_cmd.current_dir(&target_dir).output() {
            println!("{} Tailwind ha sido purgado completamente. (Configuraciones respaldadas en .aumic-bak)", "✔".green());
        }
    }

    let duration = start_time.elapsed();
    println!("\n{} Operación AUM-IC finalizada en {:.2?}\n", "[✔]".green().bold(), duration);
}
