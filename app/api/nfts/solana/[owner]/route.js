export const GET = async (req, { params }) => {
  const address = params.owner;

  try {
    const nfts = await getNftsByOwner(address);
    return new Response(JSON.stringify(nfts), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch NFTs.' }), {
      status: 500,
    });
  }
}

async function getNftsByOwner(address) {
  let pageNumber = 1;
  const limit = 1000;
  const allNfts = [];

  while (true) {
    const payload = {
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress: address,
        page: pageNumber,
        limit: limit,
      },
    };

    const response = await fetch(`https://rpc.helius.xyz/?api-key=${process.env.HELIUS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (responseData.result && responseData.result.items) {
      const nfts = responseData.result.items;
      const processedNfts = nfts.map(extractNftData);
      allNfts.push(...processedNfts);

      if (nfts.length < limit) {
        break;
      }

      pageNumber += 1;
    } else {
      break;
    }
  }

  return allNfts;
}

function extractNftData(nft) {
  const data = { mintAddress: nft.id };

  const content = nft.content || {};
  const metadata = content.metadata || {};

  data.name = metadata.name;
  data.symbol = metadata.symbol;
  data.description = metadata.description;

  const links = content.links || {};
  data.image = links.image;

  return data;
}
