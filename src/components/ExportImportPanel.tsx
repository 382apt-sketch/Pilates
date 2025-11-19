import React, { useRef } from 'react';
import { useMuscleStore } from '../store/muscleStore';

/**
 * Export/Import 패널 컴포넌트 (전문가 모드)
 * - 근육 데이터를 JSON으로 내보내기
 * - JSON 파일을 가져와서 로드
 */
const ExportImportPanel: React.FC = () => {
  const { exportData, importData } = useMuscleStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // JSON 내보내기
  const handleExport = () => {
    const jsonData = exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muscle-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // JSON 가져오기
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importData(content);
      alert('데이터를 성공적으로 가져왔습니다!');
    };
    reader.onerror = () => {
      alert('파일을 읽는 중 오류가 발생했습니다.');
    };
    reader.readAsText(file);

    // 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        <h2 className="text-xl font-bold text-purple-900">전문가 모드 - 데이터 관리</h2>
      </div>

      <p className="text-sm text-purple-700 mb-6">
        근육 데이터를 JSON 파일로 내보내거나 가져올 수 있습니다. 다른 사람과 설정을 공유하거나 백업할 때 유용합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export 버튼 */}
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <div className="text-left">
            <div className="font-bold">JSON 내보내기</div>
            <div className="text-xs opacity-90">현재 데이터 저장</div>
          </div>
        </button>

        {/* Import 버튼 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <div className="text-left">
            <div className="font-bold">JSON 가져오기</div>
            <div className="text-xs opacity-90">파일에서 불러오기</div>
          </div>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {/* 사용 팁 */}
      <div className="mt-6 bg-white rounded-lg p-4 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">💡 사용 팁</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 내보낸 JSON 파일은 다른 사람과 공유할 수 있습니다</li>
          <li>• 정기적으로 백업하여 데이터 손실을 방지하세요</li>
          <li>• 가져오기 시 기존 데이터는 덮어쓰여집니다</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportImportPanel;
