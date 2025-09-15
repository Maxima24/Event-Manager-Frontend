function formatDate(date:Date | string | undefined):string{
    // if(!date) return undefined;
    return( date as Date).toISOString().split("T")[0]
}
export default formatDate