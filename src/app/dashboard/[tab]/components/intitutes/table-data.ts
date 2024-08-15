function createData(
  name: string,
  location: string,
  status?: string,
  email?: string,
  action?: string
) {
  return { name, location, status, email, action };
}

const rows = [
  createData("Vision Care Opticals", "Kandy"),
  createData("Vision Care Opticals 2", "Kandy"),
];

export default rows;
