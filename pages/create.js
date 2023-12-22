import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();

  function addPlace(place) {
    console.log("Place added (but not really...)");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}