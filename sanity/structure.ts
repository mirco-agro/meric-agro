/* eslint-disable @typescript-eslint/no-explicit-any */
const single = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

export const structure = (S: any) =>
  S.list().title("Website content").items([
    single(S, "siteSettings", "Site settings"),
    single(S, "cropFigures", "Crop figures"),
    S.divider(),
    S.listItem().title("Page text").child(
    S.list().title("Page text").items([
      single(S, "homePage", "Home page"), single(S, "journey", "Journey section"), single(S, "aboutPage", "About page"),
      single(S, "purposePage", "Our Purpose page"), single(S, "storyPage", "Our Story page"),
      single(S, "partnerPage", "Farmer Partnership page"), single(S, "contactPage", "Contact page"),
      single(S, "commitment", "Commitment statement"),
      single(S, "seoSettings", "Search engine text"),
    ])),
    S.documentTypeListItem("teamMember").title("Team"),
    S.documentTypeListItem("product").title("Products"),
    S.documentTypeListItem("service").title("Services"),
    S.documentTypeListItem("galleryItem").title("Gallery"),
  ]);