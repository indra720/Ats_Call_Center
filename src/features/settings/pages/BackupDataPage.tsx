import React, { useState } from 'react';
import {
  Database,
  Download,
  RotateCcw,
  CheckCircle2,
  Clock,
  HardDrive,
  Shield,
  Cloud,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  FileArchive,
  ChevronLeft,
  ChevronRight,
  X,
  Server,
  Lock,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface BackupSnapshot {
  id: string;
  name: string;
  type: 'Full System' | 'Leads & CRM' | 'Telephony Logs' | 'Settings Only';
  size: string;
  createdOn: string;
  region: string;
  checksum: string;
  status: 'Completed' | 'In Progress' | 'Failed';
}

const INITIAL_BACKUPS: BackupSnapshot[] = [
  {
    id: 'snp-001',
    name: 'Automated Daily Snapshot #20261027',
    type: 'Full System',
    size: '4.8 GB',
    createdOn: '27 Oct 2026, 03:00 AM',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:e3b0c44298fc1c149afb...',
    status: 'Completed',
  },
  {
    id: 'snp-002',
    name: 'Pre-Deployment Release v3.8 Backup',
    type: 'Full System',
    size: '4.7 GB',
    createdOn: '26 Oct 2026, 11:45 PM',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:7a38b1f204bc9123...',
    status: 'Completed',
  },
  {
    id: 'snp-003',
    name: 'Weekly Contacts & Pipeline Export',
    type: 'Leads & CRM',
    size: '840 MB',
    createdOn: '24 Oct 2026, 02:00 AM',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:4f90ab829141fca...',
    status: 'Completed',
  },
  {
    id: 'snp-004',
    name: 'Monthly Telephony CDR Archive Sep-2026',
    type: 'Telephony Logs',
    size: '2.1 GB',
    createdOn: '01 Oct 2026, 04:00 AM',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:d13e9a42421394a...',
    status: 'Completed',
  },
  {
    id: 'snp-005',
    name: 'Security Roles & Configuration Checkpoint',
    type: 'Settings Only',
    size: '42 MB',
    createdOn: '18 Sep 2026, 10:15 AM',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:a1b2c3d4e5f60718...',
    status: 'Completed',
  },
];

export const BackupDataPage: React.FC = () => {
  const [backups, setBackups] = useState<BackupSnapshot[]>(INITIAL_BACKUPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [restoreModalBackup, setRestoreModalBackup] = useState<BackupSnapshot | null>(null);
  const [newBackupType, setNewBackupType] = useState<'Full System' | 'Leads & CRM' | 'Telephony Logs'>('Full System');
  const [newBackupName, setNewBackupName] = useState('');

  const handleCreateBackup = (e: React.FormEvent) => {
    e.preventDefault();
    const newSnapshot: BackupSnapshot = {
      id: `snp-00${backups.length + 1}`,
      name: newBackupName.trim() || `Manual Backup #${Date.now().toString().slice(-6)}`,
      type: newBackupType,
      size: '1.2 GB',
      createdOn: 'Just now',
      region: 'AWS Mumbai (ap-south-1)',
      checksum: 'sha256:calc_in_progress...',
      status: 'Completed',
    };

    setBackups([newSnapshot, ...backups]);
    setShowCreateModal(false);
    setNewBackupName('');
    toast.success('Backup Initiated', `Snapshot ${newSnapshot.name} created and encrypted on S3.`);
  };

  const handleRestore = () => {
    if (!restoreModalBackup) return;
    toast.warning('Point-in-Time Restore Queued', `System will roll back to state from ${restoreModalBackup.createdOn}.`);
    setRestoreModalBackup(null);
  };

  const filtered = backups.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Backup & Data Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Backup & Data Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated S3 cloud snapshots, encrypted database dumps, point-in-time rollback and retention schedulers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Instant Snapshot</span>
        </button>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Automated Backup</span>
            <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Daily at 03:00 AM IST</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Last taken: 12 hrs ago</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Total Snapshots</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{backups.length} Archives</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">Encrypted AES-256</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">S3 Cloud Storage Used</span>
            <div className="text-xl font-bold text-slate-900 mt-1">12.84 GB</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Quota: 100 GB Included</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Retention Policy</span>
            <div className="text-xl font-bold text-slate-900 mt-1">365 Days</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Glacier tier archival</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Cloud className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search snapshots by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> backup archives
          </div>
        </div>

        {/* Anti-Shrink Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3.5 w-10 text-center">#</th>
                <th className="py-3 px-3.5">Snapshot Name</th>
                <th className="py-3 px-3.5">Backup Scope</th>
                <th className="py-3 px-3.5">Archive Size</th>
                <th className="py-3 px-3.5">Created Timestamp</th>
                <th className="py-3 px-3.5">Storage Region</th>
                <th className="py-3 px-3.5">SHA-256 Checksum</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {filtered.map((snp, idx) => (
                <tr key={snp.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-[#0362FA] flex items-center gap-1.5">
                      <FileArchive className="w-3.5 h-3.5 text-slate-400" />
                      <span>{snp.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{snp.id}</div>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {snp.type}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 font-mono font-bold">{snp.size}</td>
                  <td className="py-3 px-3.5 text-slate-600">{snp.createdOn}</td>
                  <td className="py-3 px-3.5 text-slate-600">{snp.region}</td>
                  <td className="py-3 px-3.5 font-mono text-[10px] text-slate-400">{snp.checksum}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" />
                      <span>{snp.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setRestoreModalBackup(snp)}
                        className="px-2 py-1 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
                      >
                        Restore
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Download .tar.gz Archive',
                            icon: <Download className="w-3.5 h-3.5" />,
                            onClick: () => toast.success(`Downloading ${snp.name}.tar.gz`),
                          },
                          {
                            label: 'Point-in-Time Restore',
                            icon: <RotateCcw className="w-3.5 h-3.5" />,
                            onClick: () => setRestoreModalBackup(snp),
                          },
                          {
                            label: 'Verify S3 Integrity Checksum',
                            icon: <Shield className="w-3.5 h-3.5" />,
                            onClick: () => toast.success('Integrity Verified', 'SHA-256 match confirmed.'),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
          <span>Showing {filtered.length} of {backups.length} snapshots</span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Backup Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Create Instant Cloud Snapshot</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBackup} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Snapshot Label / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Pre-Campaign Database Checkpoint"
                  value={newBackupName}
                  onChange={(e) => setNewBackupName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Data Scope</label>
                <select
                  value={newBackupType}
                  onChange={(e) => setNewBackupType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                >
                  <option value="Full System">Full System (Database, Recordings Metadata, Configuration)</option>
                  <option value="Leads & CRM">Leads, Pipelines & Contact Records Only</option>
                  <option value="Telephony Logs">Call Logs (CDR) & Voicemail Metadata</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-slate-600 text-[11px] space-y-1">
                <div className="font-bold text-[#0362FA]">AWS S3 ap-south-1 (Mumbai):</div>
                <div>Encrypted using KMS Master Key with 99.999999999% durability.</div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Start Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restore Warning Modal */}
      {restoreModalBackup && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-rose-900 text-sm">Confirm Point-in-Time Restore</h3>
              </div>
              <button
                onClick={() => setRestoreModalBackup(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <p className="text-slate-700 leading-relaxed">
                You are about to restore the system state to snapshot:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">{restoreModalBackup.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Created: {restoreModalBackup.createdOn}</div>
                <div className="text-[11px] text-slate-500">Size: {restoreModalBackup.size}</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
                <span className="font-bold">Caution:</span> Any calls logged, contacts created, or configuration changes made after this point will be superseded. Active agent phone calls will remain uninterrupted on the SIP gateway.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setRestoreModalBackup(null)}
                className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRestore}
                className="px-3.5 py-1.5 font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
              >
                Proceed with Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
