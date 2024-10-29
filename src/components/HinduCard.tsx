import React from 'react';
import { MapPin, Building, Briefcase, Calendar, Link, Mail, Download, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface HinduCardProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
    location: string;
    website: string;
    email: string;
    joinDate: string;
    profession: string;
    temple: { name: string; location: string };
    organization: { name: string; role: string };
    gurukul: string | null; // Add this line
  };
}

const HinduCard: React.FC<HinduCardProps> = ({ user }) => {
  const downloadPDF = () => {
    const input = document.getElementById('hindu-card');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('hindu-card.pdf');
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={downloadPDF}
        className="mb-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center"
      >
        <Download size={20} className="mr-2" />
        Download PDF
      </button>
      <div id="hindu-card" className="bg-gradient-to-br from-saffron-100 to-saffron-200 p-8 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-saffron-500 mr-6" />
          <div>
            <h2 className="text-3xl font-bold text-saffron-800">{user.name}</h2>
            <p className="text-saffron-600 text-lg">{user.handle}</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-70 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-saffron-600">
              <MapPin size={18} className="mr-2" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center text-saffron-600">
              <Link size={18} className="mr-2" />
              <a href={user.website} className="hover:underline">{user.website}</a>
            </div>
            <div className="flex items-center text-saffron-600">
              <Mail size={18} className="mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-saffron-600">
              <Calendar size={18} className="mr-2" />
              <span>{user.joinDate}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-70 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-saffron-800 mb-4">Professional & Spiritual Journey</h3>
          <div className="flex items-center text-saffron-700 mb-4">
            <Briefcase size={20} className="mr-2" />
            <span>{user.profession}</span>
          </div>
          <h4 className="text-lg font-semibold text-saffron-700 mb-2">Primary Temple</h4>
          <p className="text-saffron-600 mb-4">
            {user.temple.name} - {user.temple.location}
          </p>
          <h4 className="text-lg font-semibold text-saffron-700 mb-2">Primary Organization</h4>
          <p className="text-saffron-600 mb-4">
            {user.organization.name} - {user.organization.role}
          </p>
          <h4 className="text-lg font-semibold text-saffron-700 mb-2">Gurukul</h4>
          <div className="flex items-center text-saffron-600">
            <BookOpen size={18} className="mr-2" />
            <span>{user.gurukul || 'Not Assigned'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HinduCard;