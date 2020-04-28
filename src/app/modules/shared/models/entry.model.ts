export interface Entry {
  id: string;
  start_date: Date;
  end_date: Date;
  activity: string;
  technologies: string[];
  comments?: string;
  uri?: string;
  project_id?: string;
}

export interface NewEntry {
  project_id: string;
  start_date?: string;
  description?: string;
  technologies?: string[];
  uri?: string;
}
