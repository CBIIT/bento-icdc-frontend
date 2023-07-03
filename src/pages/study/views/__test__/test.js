const arrayOfObjects = [
    { name: "John", age: 25 },
    { name: "Sarah", age: 30 },
    { name: "Michael", age: 35 }
  ];
  
  const stringRepresentation = arrayOfObjects.map(obj => {
    const entries = Object.entries(obj);
    const formattedEntries = entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
    return "{" + formattedEntries.join(", ") + "}";
  }).join(",");
  
  // console.log(stringRepresentation);
  
  {
    file_name: "010015_0103_sorted.bam",
    file_type: "RNA Sequence File",
    association: "sample",
    file_description: "tumor sample binary alignment file: seq reads to canfam3.1",
    file_format: "bam",
    file_size: 17545870661,
    case_id: "NCATS-COP01-CCB010015",
    breed: "Mixed Breed",
    diagnosis: "B Cell Lymphoma",
    study_code: "NCATS-COP01",
    file_uuid: "bf7ae08f-0afe-5aa5-969a-de9a17ac0f2f",
    md5sum: "70ec6bee3d4e5bb9da4641c3fa7f8609",
    sample_id: "NCATS-COP01-CCB010015 0103",
    individual_id: null,
    name: "010015_0103_sorted.bam",
    drs_uri: "https://nci-crdc.datacommons.io/ga4gh/drs/v1/objects/dg.4DFC/bf7ae08f-0afe-5aa5-969a-de9a17ac0f2f",
  }