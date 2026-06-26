import HelloReact from '@/app/components/HelloReact.jsx';

function Layout({ children }) {
  return (
    <>
      <HelloReact />
      <main>{children}</main>
    </>
  );
}

export default Layout;