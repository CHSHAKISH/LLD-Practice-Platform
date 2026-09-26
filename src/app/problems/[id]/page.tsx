import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Workspace from "./Workspace";

export default async function ProblemWorkspacePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  
  const problem = await prisma.problem.findUnique({
    where: { id },
  });

  if (!problem) {
    notFound();
  }

  return <Workspace problem={problem} />;
}
