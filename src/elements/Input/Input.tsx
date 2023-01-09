import styled from "styled-components";

export const Input = styled.input`
  padding: 0.375rem 0.75rem;
  font-family: "Times New Roman";
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  &:focus,
  &:active {
    border-color: #86b7fe;
  }
  &:hover {
    transform: scale(1.02);
  }
`;
