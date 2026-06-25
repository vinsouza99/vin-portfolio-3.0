// src/lib/actions/scroll-reveal.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function scrollReveal(node: HTMLElement, delay: number = 0) {
	gsap.fromTo(
		node,
		{ opacity: 0, y: 50 },
		{
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: 'power2.inOut',
			delay,
			scrollTrigger: {
				trigger: node,
				start: 'top 95%', // fires when top of item hits 50% down the viewport
				toggleActions: 'play none none none'
			}
		}
	);

	return {
		destroy() {
			ScrollTrigger.getAll()
				.filter((t) => t.trigger === node)
				.forEach((t) => t.kill());
		}
	};
}
