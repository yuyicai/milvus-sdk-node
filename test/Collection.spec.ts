import { MilvusNode } from "../milvus/index";

import { COLLECTION_NAME, DIMENSION, INDEX_FILE_SIZE, IP } from "../const";
import { ErrorCode } from "../milvus/response-types";

let milvusClient: any = null;
describe("Collection Crud", () => {
  beforeAll(() => {
    milvusClient = new MilvusNode(IP);
  });
  it(`Create Collection `, async () => {
    const res = await milvusClient.createCollection({
      collection_name: COLLECTION_NAME,
      dimension: DIMENSION,
      metric_type: 1,
      index_file_size: INDEX_FILE_SIZE,
    });
    expect(res.error_code).toEqual(ErrorCode.SUCCESS);
  });

  it("Show Collections", async () => {
    const res = await milvusClient.showCollections();
    expect(res.collection_names).toEqual([COLLECTION_NAME]);
  });

  it("Has Collection ", async function () {
    const res = await milvusClient.hasCollection({
      collection_name: COLLECTION_NAME,
    });
    expect(res.bool_reply).toBe(true);
  });

  it("Describe Collection", async function () {
    const res = await milvusClient.describeCollection({
      collection_name: COLLECTION_NAME,
    });
    expect(res.collection_name).toEqual(COLLECTION_NAME);
    expect(Number(res.dimension)).toEqual(DIMENSION);
    expect(Number(res.index_file_size)).toEqual(INDEX_FILE_SIZE);
    expect(res.metric_type).toEqual(1);
  });

  it("Count Collection", async function () {
    const res = await milvusClient.countCollection({
      collection_name: COLLECTION_NAME,
    });
    expect(Number(res.collection_row_count)).toEqual(0);
  });

  it("Show Collection Info", async function () {
    const res = await milvusClient.showCollectionsInfo({
      collection_name: COLLECTION_NAME,
    });
    // const infos = JSON.parse(res.json_info);
    expect(res).toHaveProperty("json_info");
    expect(res).toHaveProperty("status");
  });

  it("Drop Collection", async function () {
    const res = await milvusClient.dropCollection({
      collection_name: COLLECTION_NAME,
    });
    expect(res.error_code).toEqual("SUCCESS");
  });
});
