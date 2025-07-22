import { jsPDF } from "jspdf";

const DownloadPolicyButton = ({ application }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add content
    doc.setFontSize(16);
    doc.text("Approved Policy Document", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${application.name}`, 20, 40);
    doc.text(`Email: ${application.email}`, 20, 50);
    doc.text(`Policy: ${application.policy_title}`, 20, 60);
    doc.text(`Status: ${application.application_status}`, 20, 70);
    doc.text(`Approved Date: ${new Date().toLocaleDateString()}`, 20, 80);

    // Save as PDF
    doc.save(`${application.name}_Policy.pdf`);
  };

  return (
    <button
      className="btn btn-sm bg-green-600 text-white hover:bg-green-700 mt-2"
      onClick={handleDownload}
    >
      Download Policy
    </button>
  );
};

export default DownloadPolicyButton;
