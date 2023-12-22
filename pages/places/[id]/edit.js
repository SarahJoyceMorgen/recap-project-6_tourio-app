import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);

  async function editPlace(updatedPlace) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlace),
    });

    if (response.ok) {
      mutate();
      router.push(`/places/${id}`);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref>
        <StyledLink $justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
/* kurze Erklärung, was hier passiert.... EditPlace wird aufgerufen, 
wenn das Formular versendet wird. Dabei ist es eine PATCH Anfrage an die API um die Ortsdaten zu aktualisieren. 
(PATCH ist wie ein Handwerker, der nur die Teile eines Möbels repariert, 
die kaputt sind, ohne das gesamte Möbelstück zu ersetzen. Es ermöglicht, 
gezielte Aktualisierungen an einer Ressource vorzunehmen, ohne den gesamten Inhalt zu ändern.)

