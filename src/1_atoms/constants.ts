/**
 * [EN] Immutable constants that form the AUM-IC transmutation vocabulary.
 * [ES] Constantes inmutables que forman el vocabulario de transmutación AUM-IC.
 */

/** [EN] O(n) pre-filter: quickly confirms Tailwind presence before invoking the Babel AST pipeline. [ES] Pre-filtro O(n): confirma rápidamente la presencia de Tailwind antes de invocar el pipeline AST Babel. */
export const TAILWIND_SNIPER_REGEX = /(class(Name)?=|className:|\b(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:|flex\b|grid\b|block\b|hidden\b|absolute\b|relative\b|bg-[a-z]+-\d{1,3}|text-[a-z]+-\d{1,3}|p[xytrbl]?-\d|m[xytrbl]?-\d|w-\d|h-\d|gap-\d|border|rounded|shadow|z-\d0|opacity-\d{2}|leading-|tracking-)|@apply|@tailwind)/;

/** [EN] Maps component file names to AUM-IC abbreviated identifiers for class generation. [ES] Mapea nombres de archivo de componentes a identificadores abreviados AUM-IC para la generación de clases. */
export const COMPONENT_ALIASES: Record<string, string> = {
    button: 'btn',    icon: 'icon',    input: 'input',   badge: 'badge',
    link: 'link',     label: 'lbl',    card: 'card',     form: 'form',
    dropdown: 'drop', menu: 'menu',    list: 'list',     modal: 'modal',
    header: 'header', footer: 'footer',sidebar: 'sidebar',hero: 'hero',
    table: 'table',   nav: 'nav',      main: 'main',     section: 'section',
    article: 'article',page: 'page',  layout: 'layout', index: 'page',
    pricing: 'pricing',trust: 'trust',features: 'features',ecosystem: 'eco',
    teaser: 'teaser', banner: 'banner',toast: 'toast',  chip: 'chip',
    avatar: 'avatar', tag: 'tag',
};

/** [EN] Maps AUM-IC structural categories to their class name prefixes. [ES] Mapea categorías estructurales AUM-IC a sus prefijos de nombre de clase. */
export const LEVEL_PREFIX: Record<string, string> = {
    atoms: 'atom', molecules: 'molecule', organisms: 'organism',
    ecosystems: 'ecosystem', galaxies: 'galaxy',
};
