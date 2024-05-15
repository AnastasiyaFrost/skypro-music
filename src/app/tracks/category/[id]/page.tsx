type CategoryType = {
    params: {id:string};
}

export default function CategoryPage({ params }: CategoryType) {
  return (
    <>
      <p>Страница категория {params.id}</p>
    </>
  );
};