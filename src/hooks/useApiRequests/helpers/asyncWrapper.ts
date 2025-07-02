export async function asyncWrapper(
  asyncRequest: () => Promise<any>
): Promise<{ data?: any; success: boolean; message?: string; error?: any }> {
  try {
    const { data } = await asyncRequest();

    return {
      data,
      success: data !== undefined
    };
  } catch (error: any) {
    return {
      error,
      success: false
    };
  }
}
