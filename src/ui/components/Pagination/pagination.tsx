const Paginate = (followers:any) => {
    // Sort followers based on their id in descending order
    const sortedFollowers = [...followers].sort((a, b) => b?.id - a?.id);
  
  
    const itemsPerPage = 16
    const pages = Math.ceil(sortedFollowers.length / itemsPerPage);
    const newFollowers = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return sortedFollowers.slice(start, start + itemsPerPage);
    });
  
    return newFollowers;
  };
  
  export default Paginate;
  