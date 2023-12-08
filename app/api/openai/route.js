import OpenAIApi from 'openai';
import { functions, solanaSwaps, ethereumSwaps } from './functions.json';

const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

export const POST = async (req) => {
  const { prompt, solanaAddress, ethereumAddress } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: prompt }],
      functions: functions,

      temperature: 0,
    });
    
    const responseMessage = response.choices[0].message;

    if (responseMessage.function_call.name === "fetchSolanaNFTs") {
      const nftResponse = await fetch(`${process.env.HOMEPAGE_URL}/api/nfts/solana/${solanaAddress}`);
      const nftData = await nftResponse.json();

      return new Response(JSON.stringify({
        nftData,
        functionName: responseMessage.function_call.name,
        functionArgs: responseMessage.function_call.arguments
      }), { status: 200 });

    } else if (responseMessage.function_call.name === "fetchEthereumNFTs") {
      const nftResponse = await fetch(`${process.env.HOMEPAGE_URL}/api/nfts/ethereum/${ethereumAddress}`);
      const nftData = await nftResponse.json();

      return new Response(JSON.stringify({
        nftData,
        functionName: responseMessage.function_call.name,
        functionArgs: responseMessage.function_call.arguments
      }), { status: 200 });

    } else if (solanaSwaps.includes(responseMessage.function_call.name)) {
      let args;
      try {
        args = JSON.parse(responseMessage.function_call.arguments);
      } catch (e) {
        args = responseMessage.function_call.arguments;
      }

      const nftResponse = await fetch(`${process.env.HOMEPAGE_URL}/api/nfts/solana/${solanaAddress}`);
      const nftData = await nftResponse.json();

      return new Response(JSON.stringify({
        nftData,
        functionName: responseMessage.function_call.name,
        functionArgs: args
      }), { status: 200 });

    } else if (ethereumSwaps.includes(responseMessage.function_call.name)) {
      let args;
      try {
        args = JSON.parse(responseMessage.function_call.arguments);
      } catch (e) {
        args = responseMessage.function_call.arguments;
      }

      const nftResponse = await fetch(`${process.env.HOMEPAGE_URL}/api/nfts/ethereum/${ethereumAddress}`);
      const nftData = await nftResponse.json();

      return new Response(JSON.stringify({
        nftData,
        functionName: responseMessage.function_call.name,
        functionArgs: args
      }), { status: 200 });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
