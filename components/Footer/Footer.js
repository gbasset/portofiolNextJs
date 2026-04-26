import React from 'react'
export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <footer className="px-3 pt-3 pb-2">
            <div className="mx-auto flex w-full max-w-[185px] flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
                <div className="flex items-center justify-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/gaetan-basset-289b9410a/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="rounded-full border border-white/15 bg-white/5 p-2 transition hover:-translate-y-0.5 hover:bg-white/10"
                    >
                        <img src="/logos/iconmonstr-linkedin-2-svg.svg" alt="linkedin" width={34} height={34} />
                    </a>

                    <a
                        href="https://github.com/gbasset"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="rounded-full border border-white/15 bg-white/5 p-2 transition hover:-translate-y-0.5 hover:bg-white/10"
                    >
                        <img src="/logos/iconmonstr-github-1-svg.svg" alt="github" width={34} height={34} />
                    </a>
                </div>

                <a
                    className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 transition hover:bg-black/30"
                    href="https://www.codewars.com/users/gbasset"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Codewars"
                >
                    <img src="https://www.codewars.com/users/gbasset/badges/micro" alt="codewars logo" />
                </a>
            </div>

            <div className="mt-4 text-center text-[var(--size-3)] leading-relaxed text-slate-300/90">
                <p>© Basset Gaëtan {today} Tous droits réservés</p>
            </div>
        </footer>
    )
}
