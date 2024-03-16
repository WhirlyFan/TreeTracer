from app.models import db, JobApps, environment, SCHEMA

def seed_job_apps():
    jobapp1 = JobApps(
        company='Facebook',
        job_title='Software Engineer I',
        list_id='1'
    )
    jobapp2 = JobApps(
        company='Google',
        job_title='Software Engineer I',
        list_id='1'
    )
    jobapp3 = JobApps(
        company='LinkedIn',
        job_title='Software Engineer I',
        list_id='1'
    )

    db.session.add(jobapp1)
    db.session.add(jobapp2)
    db.session.add(jobapp3)
    db.session.commit()

def undo_job_apps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.job_apps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM job_apps")
        
    db.session.commit()
