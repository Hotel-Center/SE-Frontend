import CustomerProfileUpdateForm from "@/components/profile/CustomerProfileUpdateForm";
import ManagerProfileUpdateForm from "@/components/profile/ManagerProfileUpdateForm";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { cookies, makeURL } from "src/Utils/common";
import references from "src/assets/References.json";

export default function ProfilePage() {
  const [role, setRole] = useState("U");
  function getRole() {
    axios
      .get(makeURL(references.url_getrole), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        setRole(response.data.role);
      });
  }

  useEffect(() => {
    getRole();
  }, []);

  return role == "C" ? (
    <CustomerProfileUpdateForm />
  ) : role == "M" ? (
    <ManagerProfileUpdateForm />
  ) : (
    <CircularProgress />
  );
}
