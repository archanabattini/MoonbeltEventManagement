using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MoonbeltEventManager.Models
{
    public partial class MoonbeltContext : DbContext
    {
        public MoonbeltContext()
        {
        }

        public MoonbeltContext(DbContextOptions<MoonbeltContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Drink> Drinks { get; set; }
        public virtual DbSet<Party> Parties { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<PersonParty> PersonParties { get; set; }

       /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=HARISHDHULIC7DB;Initial Catalog=Moonbelt;Persist Security Info=True;User ID=archana;Password=sqlserver2021;MultipleActiveResultSets=True;Connection Timeout=30;");
            }
        }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Drink>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Party>(entity =>
            {
                entity.Property(e => e.EndDateTime).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StartDateTime).HasColumnType("datetime");

                entity.Property(e => e.Venue)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PersonParty>(entity =>
            {
                entity.HasKey(e => new { e.PersonId, e.PartyId })
                    .HasName("Composite_PersonParty");

                entity.ToTable("PersonParty");

                entity.HasOne(d => d.Drink)
                    .WithMany(p => p.PersonParties)
                    .HasForeignKey(d => d.DrinkId)
                    .HasConstraintName("Foreign_Drink");

                entity.HasOne(d => d.Party)
                    .WithMany(p => p.PersonParties)
                    .HasForeignKey(d => d.PartyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Foreign_Party");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.PersonParties)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Foreign_Person");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
