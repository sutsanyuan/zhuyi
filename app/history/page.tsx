import { PageHeader } from "@/components/PageHeader";

export default function HistoryPage() {
    return (
        <main className="mx-auto max-w-[520px] px-6 pb-28">
            <PageHeader title="History" />
            <p className="text-muted">即將推出：每週五會自動把上一週的菜單存在這裡。</p>
        </main>
    );
}
