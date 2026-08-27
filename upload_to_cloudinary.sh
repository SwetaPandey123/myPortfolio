#!/bin/bash
# Upload image to Cloudinary
# Usage: bash upload_to_cloudinary.sh /path/to/your/image.png

IMAGE_PATH="$1"
CLOUD_NAME="akphv6j6"
API_KEY="532818647148246"
API_SECRET="HPgG6EEwHp-AWny2VJB8YiwoaR0"

if [ -z "$IMAGE_PATH" ]; then
  echo "❌ Please provide image path as argument"
  echo "Usage: bash upload_to_cloudinary.sh /path/to/image.png"
  exit 1
fi

echo "⬆️  Uploading $IMAGE_PATH to Cloudinary..."

TIMESTAMP=$(date +%s)
PUBLIC_ID="sweta_profile_photo"
SIGNATURE_STRING="public_id=${PUBLIC_ID}&timestamp=${TIMESTAMP}${API_SECRET}"
SIGNATURE=$(echo -n "$SIGNATURE_STRING" | shasum -a 256 | awk '{print $1}')

RESULT=$(curl -s -X POST \
  "https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload" \
  -F "file=@${IMAGE_PATH}" \
  -F "api_key=${API_KEY}" \
  -F "timestamp=${TIMESTAMP}" \
  -F "public_id=${PUBLIC_ID}" \
  -F "signature=${SIGNATURE}")

echo ""
echo "✅ Upload Response:"
echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'secure_url' in data:
    print('🎉 SUCCESS!')
    print('📎 URL:', data['secure_url'])
    print('🆔 Public ID:', data['public_id'])
else:
    print('❌ Error:', data.get('error', {}).get('message', 'Unknown error'))
    print(json.dumps(data, indent=2))
"
