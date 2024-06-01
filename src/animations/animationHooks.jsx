import { fadeInVariants, slidingVariants } from './animationVariants';

export function useFadeInAnimSettings() {
    return {
        variants: fadeInVariants,
        initial: 'initial',
        whileInView: 'animate',
        transition: { ease: "anticipate", duration: 1.5 },
        viewport: { once: true },
    };
}

//remove code redundancies later
export function getDelayedFadeInAnimSettings(delaySpeed, index) {
    return {
        variants: fadeInVariants,
        initial: 'initial',
        whileInView: 'animate',
        viewport: { once: true },
        transition: {
            delay: delaySpeed * index,
            ease: "anticipate", duration: 1
        },
        custom: index
    }
}

export function getSlidingAnimSettings(delaySpeed, index) {
  return {
    variants: slidingVariants,
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true },
    transition: {
        delay: delaySpeed * index,
      ease: "anticipate",
      duration: 1
    },
    custom: index
  }
}

