export default function AccountNotificationsPage() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold text-deep-blue">
        การแจ้งเตือน
      </h2>
      <p className="mt-1 text-sm text-muted">
        การแจ้งเตือนสถานะออเดอร์และเอกสารจะแสดงที่นี่เร็วๆ นี้
      </p>
      <div className="mt-8 rounded-xl border border-dashed border-border bg-bg-light px-4 py-10 text-center text-sm text-muted">
        ยังไม่มีการแจ้งเตือนใหม่
      </div>
    </div>
  );
}
