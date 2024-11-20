export interface PostsResponse {
  id: number;
  title?: string | null;      
  content?: string | null;    
  createdBy?: string | null; 
  createdOn: Date;          
  updatedOn: Date;                 
}

