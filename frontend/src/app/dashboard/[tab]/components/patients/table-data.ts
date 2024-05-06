function createData(
  name: string,
  status: string,
  location: string,
  email: string,
  action: string
) {
  return { name, status, location, email, action };
}

const rows = [
  createData(
    "Shehan Gunasekara",
    "20004536789",
    "Kandy",
    "shehan@gmail.com",
    "Edit"
  ),
  createData(
    "Sahan Amaraweera",
    "20037456789",
    "Kurunegala",
    "sahan@hotmail.com",
    "Edit"
  ),
  createData(
    "Prageeth Gunawardana",
    "20016589745",
    "Kadawatha",
    "prgg@gmail.com",
    "Edit"
  ),
  createData(
    "Nimal Perera",
    "19784532658",
    "Matara",
    "nimal@protonmail.com",
    "Edit"
  ),
  createData(
    "Arun Thilakarathne",
    "19994536258",
    "Galle",
    "arun123@hotmail.com",
    "Edit"
  ),
  createData(
    "Supun Silva",
    "19994536258",
    "Gampaha",
    "supun@hotmail.com",
    "Edit"
  ),
  createData(
    "Kamal Gunasekara",
    "19784515958",
    "Kandy",
    "kamal@gmail.com",
    "Edit"
  ),
];

export default rows;
