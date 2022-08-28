const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.s3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

exports.uploadToS3 = async (file, imgName) => {
  const params = {
    Bucket: bucketName,
    Key: imgName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  const command = new PutObjectCommand(params);
  return await s3.send(command);
};
