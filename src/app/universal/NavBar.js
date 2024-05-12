'use client';

import styled from 'styled-components';
import { Link } from "next/link"; // Added curly braces around Link import

export default function NavBar() {
  return(
    <Nav>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo href="/">
            K.
          </Logo>
        </div>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(white 50%, #03012C 50%);
  border-bottom: 1px solid #EA638C;
  @supports (-moz-appearance:none) {
    background-color: rgba(255, 255, 255, 0.9); // Changed firefox:bg-opacity-90 to cross-browser compatible rgba
  }
`;

const Logo = styled.a` // Changed Link to a since styled-components don't work directly with Next.js Link component
  color: #ea638c;
  font-family: "Pixelify Sans";
  font-weight: 800;
  font-style: normal;
  font-size: 2.5rem;
  &:hover {
    text-decoration: none;
  }
`;
