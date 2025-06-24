import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home,
  Users, 
  UserCheck,
  Shield,
  Key,
  Briefcase,
  FileText
} from "lucide-react";

const navigationItems = [
  {
    title: "דף הבית",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "שיוך ארגוני",
    url: createPageUrl("OrganizationalAssignment"),
    icon: Users,
  },
  {
    title: "סוג שירות",
    url: createPageUrl("ServiceType"),
    icon: UserCheck,
  },
  {
    title: "חיל",
    url: createPageUrl("Corps"),
    icon: Shield,
  },
  {
    title: "סמכות",
    url: createPageUrl("Authority"),
    icon: Key,
  },
  {
    title: "משרה",
    url: createPageUrl("Position"),
    icon: Briefcase,
  },
  {
    title: "דוחות",
    url: createPageUrl("Reports"),
    icon: FileText,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = !collapsed || isHovered;

  return (
    <div className="min-h-screen w-full bg-gradient-to-bl from-slate-50 via-blue-50/30 to-indigo-50/20" dir="rtl">
      <style>
      {`
        :root {
          --sidebar-width: 288px;
          --sidebar-collapsed-width: 80px;
        }
      `}
      </style>
      
      {/* סרגל צד */}
      <div 
        className={`fixed top-0 right-0 h-full z-40 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-[var(--sidebar-width)]' : 'w-[var(--sidebar-collapsed-width)]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border-l border-blue-100/60 bg-white/95 backdrop-blur-sm h-full w-full shadow-lg">
          {/* כותרת עם לוגו */}
          <div className="border-b border-blue-100/60 p-4 h-[73px] flex items-center justify-center">
            <div className={`flex items-center gap-3 transition-all duration-300`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className={`transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                <h2 className="font-bold text-slate-800 text-lg whitespace-nowrap">ניהול עובדים</h2>
                <p className="text-sm text-slate-500 whitespace-nowrap">ממשק SAP</p>
              </div>
            </div>
          </div>
          
          {/* תפריט ניווט */}
          <div className="p-3">
            <div className={`text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3 transition-opacity duration-200 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              תפריט ניווט
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                    !isExpanded && 'justify-center'
                  } ${
                    location.pathname === item.url 
                      ? 'bg-gradient-to-l from-blue-50 to-indigo-50 text-blue-700 shadow-sm border-r-4 border-blue-500' 
                      : 'text-slate-600'
                  }`}
                  title={!isExpanded ? item.title : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`font-medium whitespace-nowrap transition-all duration-200 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* פוטר */}
          <div className={`absolute bottom-0 left-0 right-0 border-t border-blue-100/60 p-4 transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 h-0 p-0'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">מ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 text-sm truncate">מנהל מערכת</p>
                <p className="text-xs text-slate-500 truncate">ניהול פעולות עובדים</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* תוכן ראשי */}
      <main 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out" 
        style={{ 
          marginRight: isExpanded ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)' 
        }}
      >
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
