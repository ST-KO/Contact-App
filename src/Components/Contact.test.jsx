import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("Contacts Component", () => {
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  test("displays loading text initially", () => {
    axios.get.mockResolvedValueOnce({ data: [] }); 

    render(<App />);
    expect(screen.queryByText("Loading Data....")).not.toBeNull();
  });

  test("renders a list of contacts", async () => {
    const mockContacts = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", address: { city: "New York" } },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", address: { city: "Los Angeles" } },
    ];

    axios.get.mockResolvedValueOnce({ data: mockContacts });

    render(<App />);
    await waitFor(() => screen.getByText("Contacts")); 
    mockContacts.forEach((contact) => {
      expect(screen.getByText(contact.name)).not.toBeNull();
      expect(screen.getByText(`Email: ${contact.email}`)).not.toBeNull();
      expect(screen.getByText(`Phone: ${contact.phone}`)).not.toBeNull();
      expect(screen.getByText(`City: ${contact.address.city}`)).not.toBeNull();
    });
  });

  test("shows error message on API failure", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    render(<App />);
    await waitFor(() => screen.getByText("Failed to fetch contacts")); 
    expect(screen.queryByText("Failed to fetch contacts")).not.toBeNull();
  });
});
