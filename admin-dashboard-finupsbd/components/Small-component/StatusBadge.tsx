import { TLoanStatusType } from "@/types/sharedTypes";

const statusStyleMap: Record<string, string> = {
  SUBMITTED: 'bg-blue-500 text-white',
  PENDING: 'bg-yellow-500 text-white',
  IN_PROGRESS: 'bg-indigo-600 text-white',
  APPROVED: 'bg-green-600 text-white',
  REJECTED: 'bg-red-600 text-white',
  COMPLETED: 'bg-gray-600 text-white',
};

const StatusBadge = ({ status, className = '' }: { status: string; className?: string }) => {
  const s = status?.toUpperCase() ?? '';
  const cls = statusStyleMap[s] || 'bg-muted text-foreground';

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${cls} ${className}`}>
      {s.replace(/_/g, ' ').toLowerCase().replace(/(^\w|\s\w)/g, c => c.toUpperCase())}
    </span>
  );
};

export default StatusBadge;
