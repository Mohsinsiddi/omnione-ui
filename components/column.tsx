"use client";

import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type ProjectDataType = {
  status: "verified" | "unverified";
  name: string;
  image: string;
  collectionSupply: string;
  ownerAddressOnEth: string;
  ownerAddresOnSol: string;
  sourceChain: string;
  destinationChain: string;
  collectionAddressOnEth: string;
  creatorAddresOnSol: string;
  updateAuthorityOnSol: string;
  sellerBasisPointOnSol: string;
  collectionMintAddressOnSol: string;
  isVerified: boolean;
  action: string;
};

export const columns: ColumnDef<ProjectDataType>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "collectionSupply",
    header: "Collection Supply",
  },
  {
    accessorKey: "ownerAddressOnEth",
    header: "Owner Address(ETH)",
  },
  {
    accessorKey: "ownerAddresOnSol",
    header: "Owner Address(SUI)",
  },
  {
    accessorKey: "sourceChain",
    header: "Source Chain",
  },
  {
    accessorKey: "destinationChain",
    header: "Destination Chain",
  },
  {
    accessorKey: "collectionAddressOnEth",
    header: "Collection Address(ETH)",
  },
  {
    accessorKey: "creatorAddresOnSol",
    header: "Creator Address(SUI)",
  },
  {
    accessorKey: "updateAuthorityOnSol",
    header: "Update Authority(SUI)",
  },
  {
    accessorKey: "sellerBasisPointOnSol",
    header: "Seller Basis Points(SUI)",
  },
  {
    accessorKey: "collectionMintAddressOnSol",
    header: "Collection Mint (SUI)",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
