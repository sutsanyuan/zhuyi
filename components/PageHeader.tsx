// 每一頁最上面的英文大標題（Menu、Shopping…）
export function PageHeader({ title }: { title: string }) {
    return (
        <header className="pt-10 pb-5">
            <h1 className="font-display text-[36px] leading-none">{title}</h1>
        </header>
    );
}
