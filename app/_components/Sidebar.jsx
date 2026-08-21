const Sidebar = function ({ className = "" }) {
  return (
    <aside
      className={`h-full bg-(--color-surface-secondary) border-(--color-border) border-r ${className}`}
    >
      hello world
    </aside>
  );
};
export default Sidebar;
