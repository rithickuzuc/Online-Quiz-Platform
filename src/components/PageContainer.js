import React from 'react';
export default function PageContainer({ title, children }){
  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <div className="card">{children}</div>
    </div>
  );
}
