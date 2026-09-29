/**
 * [EN] Bounded concurrent task runner. Processes items in parallel up to the configured worker limit.
 * [ES] Ejecutor de tareas concurrentes acotado. Procesa ítems en paralelo hasta el límite configurado.
 */
export async function runConcurrent<T, R>(
    items: T[],
    concurrency: number,
    task: (item: T) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];
    const iterator = items.entries();
    const workers = Array(concurrency).fill(iterator).map(async (iter) => {
        for (const [index, item] of iter) {
            results[index] = await task(item);
        }
    });
    await Promise.all(workers);
    return results;
}
