import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../../components/List";
import { useValidateAuth } from "../../hooks/useValidateAuth";
import { ILists } from "../../interfaces/ILists";
import { list } from "../../services/list";
import { retrieveUserId } from "../../utils/retrieveUserId";
import { Container } from "./styles";

export default function Lists() {
  const [lists, setLists] = useState<ILists[]>([]);

  useValidateAuth();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("auth_token") || "";
      const userId = retrieveUserId(token);
      const { data } = await list.fetchListByUserId(userId, token);
      setLists(data);
    })();
  }, []);

  return (
    <Container>
      <Link className="new-btn" to={`/lists/new`}>
        <span>New List</span>
      </Link>

      <List lists={lists} />
    </Container>
  );
}
