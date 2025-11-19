import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { PostureIssue } from '../utils/postureAnalysis';
import { useMuscleStore } from '../store/muscleStore';
import musclesData from '../data/muscles.json';
import postureRulesData from '../data/postureRules.json';

interface PDFGeneratorProps {
  postureIssues: PostureIssue[];
}

/**
 * PDF 생성 컴포넌트
 * - 근육 상태와 자세 분석 결과를 PDF로 생성
 */
const PDFGenerator: React.FC<PDFGeneratorProps> = ({ postureIssues }) => {
  const { muscleStates } = useMuscleStore();

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // 헤더
      pdf.setFontSize(20);
      pdf.text('근육 강도 분석 & 자세 평가 보고서', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      pdf.setFontSize(10);
      pdf.text(`생성일: ${new Date().toLocaleDateString('ko-KR')}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;

      // 근육 상태 요약
      pdf.setFontSize(14);
      pdf.text('1. 근육 강도 현황', 15, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      const muscleEntries = Object.entries(muscleStates);
      
      muscleEntries.forEach(([muscleId, strength]) => {
        const muscle = musclesData.find(m => m.id === muscleId);
        if (muscle) {
          const strengthLabel = postureRulesData.strength_levels[strength as keyof typeof postureRulesData.strength_levels]?.label_ko || '보통';
          pdf.text(`• ${muscle.label_ko}: ${strengthLabel}`, 20, yPosition);
          yPosition += 6;
          
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
        }
      });

      yPosition += 10;

      // 자세 분석 결과
      pdf.setFontSize(14);
      pdf.text('2. 자세 분석 결과', 15, yPosition);
      yPosition += 8;

      if (postureIssues.length === 0) {
        pdf.setFontSize(10);
        pdf.text('✓ 특별한 자세 이상이 감지되지 않았습니다.', 20, yPosition);
      } else {
        postureIssues.forEach((issue, index) => {
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = 20;
          }

          pdf.setFontSize(12);
          pdf.text(`${index + 1}. ${issue.name_ko}`, 20, yPosition);
          yPosition += 7;

          pdf.setFontSize(9);
          pdf.text(`심각도: ${issue.severity}점`, 25, yPosition);
          yPosition += 5;

          const descLines = pdf.splitTextToSize(issue.description_ko, pageWidth - 50);
          pdf.text(descLines, 25, yPosition);
          yPosition += descLines.length * 5 + 3;

          pdf.text('추천 운동:', 25, yPosition);
          yPosition += 5;

          issue.recommended_exercises.forEach((exercise) => {
            pdf.text(`  - ${exercise}`, 30, yPosition);
            yPosition += 5;
          });

          yPosition += 5;
        });
      }

      // 경고 문구
      yPosition += 10;
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      const disclaimer = '※ 이 분석은 참고용이며, 전문가의 정확한 진단을 대체할 수 없습니다.';
      pdf.text(disclaimer, pageWidth / 2, yPosition, { align: 'center' });

      // PDF 저장
      pdf.save(`muscle-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
      
      alert('PDF가 생성되었습니다!');
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
      </svg>
      PDF 다운로드
    </button>
  );
};

export default PDFGenerator;
