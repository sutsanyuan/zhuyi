export default function Home() {
    return (
        <main className="mx-auto flex max-w-[520px] flex-col gap-10 px-4 py-6">
            <h1 className="font-display text-[28px] font-black">本週菜單</h1>
            <div className="flex flex-col gap-2">
                <div className="rounded-card border border-line bg-surface p-4">
                    <p className="font-bold">番茄燉牛腩</p>
                    <p className="text-sm text-muted">牛腩 1 斤、番茄 3 顆</p>
                </div>
                <span className="w-fit rounded-full bg-tag-bg px-2.5 py-0.5 text-xs text-tag-ink">
                    挑戰
                </span>
            </div>
            <button className="rounded-xl bg-leek py-3 font-bold text-on-leek">看採買清單</button>
        </main>
    );
}
