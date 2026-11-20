/* eslint-disable @typescript-eslint/no-explicit-any */
const single = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

export const structure = (S: any) =>
  S.list().title("Website content").items([
    single(S, "siteSettings", "Site settings"),
    single(S, "cropFigures", "Crop figures"),
    S.divider(),
    S.documentTypeListItem("teamMember").title("Team"),
    S.documentTypeListItem("product").title("Products"),
    S.documentTypeListItem("service").title("Services"),
    S.documentTypeListItem("galleryItem").title("Gallery"),
  ]);