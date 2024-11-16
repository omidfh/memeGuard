// components/AppLayout.jsx

function AppLayout({ children }) {
  return (
    <>
      <div className="background"></div>
      <div className="content">{children}</div>
    </>
  );
}

export default AppLayout;
