'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuOpen, setIsScrolled } from '@/features/navigation/uiSlice';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';
import { Infinity } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

const menuItems = [
  {
    label: "Home",
    ariaLabel: "Go to home page",
    link: "/",
  },
  {
    label: "About",
    ariaLabel: "Learn about us",
    link: "/#motion-card-section",
  },
  {
    label: "Events",
    ariaLabel: "View our events",
    link: "/events",
  },
  {
    label: "Teams",
    ariaLabel: "Meet the LoopLab team",
    link: "/#team",
  },
  {
    label: "Contact",
    ariaLabel: "Get in touch",
    link: "/contact",
  },
];

const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com/company/looplab' },
    { label: 'Instagram', link: 'https://instagram.com/teamlooplab' },
    { label: 'TikTok', link: 'https://tiktok.com/@teamlooplab' }
];

export default function Navbar() {
    const dispatch = useDispatch();

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // Initial default depending on page section presence
        if (navbar) {
            if (contentSection) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            }
        }

        const updateNavbarColor = () => {
            if (!navbar) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;

            if (footerEl) {
                const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;
                if (scrollPos >= footerTop) {
                    navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
                    return;
                }
            }

            if (!contentSection) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
                return;
            }

            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;
            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;

            if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoLooplab = document.querySelector('.logo-looplab');
        if (logoLooplab) cleanups.push(initWiggle(logoLooplab, WIGGLE_CONFIG.logoLooplab));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                            <span className="logo-work-text">work</span>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/68a46f25779a71fac3a11903_SnapInsta.jpg" loading="eager" alt="Feestje bouwe? App Douwe" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">douwe egberts</span>
                                        <h4 className="nav-work-title">feestje bouwe? app douwe</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School.avif" loading="eager" alt="Skibidi school" sizes="100vw" srcSet="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School-p-500.avif 500w, https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School.avif 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">hema</span>
                                        <h4 className="nav-work-title">skibidi school</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3.avif" loading="eager" alt="Hema socials" sizes="100vw" srcSet="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3-p-500.avif 500w, https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3.avif 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">hema</span>
                                        <h4 className="nav-work-title">hema socials</h4>
                                    </div>
                                </div>
                                <a href="#" className="nav-work-btn"><span className="nav-work-btn__text">All our work</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <a href="/" className="logo-looplab" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                        <Infinity size={24} strokeWidth={2.5} style={{ transform: 'translateY(1px)' }} />
                        <span style={{ fontFamily: "var(--font-pacifico, 'Pacifico', cursive)", fontSize: '28px', lineHeight: 1 }}>LOOPLAB</span>
                    </a>
                </div>
                <div className="nav-right" style={{ width: '120px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <StaggeredMenu
                        position="right"
                        items={menuItems}
                        socialItems={socialItems}
                        displaySocials={true}
                        displayItemNumbering={true}
                        menuButtonColor="currentColor"
                        openMenuButtonColor="#111"
                        changeMenuColorOnOpen={true}
                        colors={['#f0befa', '#f5693c', '#9E00FE']}
                        accentColor="#9E00FE"
                        isFixed={true}
                        onMenuOpen={() => dispatch(setMenuOpen(true))}
                        onMenuClose={() => dispatch(setMenuOpen(false))}
                    />
                </div>
            </nav>
        </>
    );
}
