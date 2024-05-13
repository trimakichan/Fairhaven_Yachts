import { fadeInVariants } from './animationVariants';


export function useFadeInAnimSettings() {
    return {
        variants: fadeInVariants,
        initial: 'initial',
        whileInView: 'animate',
        transition: { ease: "anticipate", duration: 1.5 },
        viewport: { once: true },
    };
}

export function useDelayedAnimSettings() {
    return {
        variants: fadeInVariants,
        initial: 'initial',
        whileInView: 'animate',
        transition: {
            delay: 0.8 * 1,
            ease: "anticipate", duration: 1
        },
        viewport: { once: true },
        custom: 1
    }
}

