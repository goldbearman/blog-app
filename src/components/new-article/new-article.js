import React from 'react';
// import classes from '../form/form.module.scss';
import {
  useForm, useFieldArray,
} from 'react-hook-form';
import { Button } from '@mui/material';
import cn from 'classnames';
import { ArticleContainer } from '../article-container/article-container';
import classes from './new-article.module.scss';


const NewArticle = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ tag: '' }],
    },
  });
  const {
    fields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: 'test',
  });


  const onSubmit = (data) => {
    console.log(data.test);
  };

  return (
    <ArticleContainer>
      <h1 className={classes.titleNewArticle}>Create new article</h1>
      <form className={classes.formBlog} onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Title
          <input
            // className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Title"
            {...register('test.title')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Short description
          <input
            // className={cn(errors?.Password && classes.error)}
            type="text"
            placeholder="Title"
            {...register('test.description')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Text
          <textarea
            type="text"
            placeholder="Text"
            {...register('test.body')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Tags
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <input placeholder="Tag" className={classes.inputTags} {...register(`test.${index}.tag`)} />

                {/* <Controller */}
                {/*  render={({ field }) => <input {...field} />} */}
                {/*  name={`test.${index}.lastName`} */}
                {/*  control={control} */}
                {/* /> */}
                <Button className={cn(classes.button, classes.buttonDel)} type="button" onClick={() => remove(index)}>Delete</Button>
              </li>
            ))}
            <Button
              className={cn(classes.button, classes.buttonAdd)}
              type="button"
              onClick={() => {
                append({ tag: '' });
              }}
            >
              Add tag
            </Button>
          </ul>
        </label>
        <input className={classes.submitButton} value="Save" type="submit" />
      </form>
    </ArticleContainer>
  );
};

export default NewArticle;
