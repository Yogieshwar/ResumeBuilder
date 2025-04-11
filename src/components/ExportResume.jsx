// ResumeDownloadButton.jsx
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ExportResume = () => {
  const exportPDF = () => {
    const resume = document.getElementById("resume-content");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = 297;
    const margin = 10;

    html2canvas(resume, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });
  };

  return (
    <button onClick={exportPDF} className="btn-download">
      Download Resume PDF
    </button>
  );
};

export default ExportResume;
