/**
 * Simple timing utility for benchmarking
 */
const IS_BENCHMARK_ENABLED = typeof window !== 'undefined' &&
    (localStorage.getItem('benchmark_enabled') === 'true' || process.env.NODE_ENV === 'development');

export const benchmark = {
    start: (label: string) => {
        if (typeof window !== 'undefined' && IS_BENCHMARK_ENABLED) {
            console.time(label);
        }
        return Date.now();
    },
    end: (label: string, startTime?: number) => {
        if (typeof window !== 'undefined' && IS_BENCHMARK_ENABLED) {
            console.timeEnd(label);
        }
        if (startTime) {
            const duration = Date.now() - startTime;
            return duration;
        }
        return 0;
    }
};

/**
 * Higher-order function to measure execution time
 */
export async function measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const start = benchmark.start(label);
    try {
        const result = await fn();
        benchmark.end(label, start);
        return result;
    } catch (error) {
        benchmark.end(label, start);
        throw error;
    }
}
