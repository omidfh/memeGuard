// components/NavBar.jsx
import React from "react";
import { AppShell, Burger, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { FaHome, FaInfoCircle, FaCheck } from "react-icons/fa"; // Using react-icons

function NavBar({ children }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            style={{ marginRight: 15 }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              MemeGuard
            </h1>
          </Link>
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        hidden={!opened}
        hiddenFrom="sm"
        width={{ sm: 250, lg: 300 }}
        padding="md"
      >
        <AppShell.Section>
          <NavLink
            label="Home"
            icon={<FaHome size={20} />}
            component={Link}
            to="/"
            onClick={() => toggle()}
          />
        </AppShell.Section>

        <AppShell.Section>
          <NavLink
            label="Check Token"
            icon={<FaCheck size={20} />}
            component={Link}
            to="/check"
            onClick={() => toggle()}
          />
        </AppShell.Section>

        <AppShell.Section>
          <NavLink
            label="About"
            icon={<FaInfoCircle size={20} />}
            component={Link}
            to="/about"
            onClick={() => toggle()}
          />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default NavBar;
