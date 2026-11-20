import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = imageUrlBuilder({ projectId, dataset });
export const img = (src: unknown, w = 1200) => builder.image(src as never).width(w).auto("format").url();